'use client';

import React, { useState, useEffect, useRef } from 'react';
import './PaymentForm.css';

interface PaymentFormProps {
  amount?: number;
  mode?: 'button' | 'input';
  onSuccess?: (payment: any) => void;
  onError?: (error: Error) => void;
  apiUrl?: string;
  squareAppId?: string;
  squareLocationId?: string;
}

interface SquareCard {
  attach: (element: HTMLElement) => Promise<void>;
  destroy: () => void;
  tokenize: () => Promise<any>;
  addEventListener: (event: string, callback: (event: any) => void) => void;
}

interface SquarePayments {
  card: () => Promise<SquareCard>;
}

declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => SquarePayments;
    };
  }
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount: propAmount,
  mode = 'button',
  onSuccess,
  onError,
  apiUrl = process.env.NEXT_PUBLIC_API_URL || '',
  squareAppId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
  squareLocationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
}) => {
  const [card, setCard] = useState<SquareCard | null>(null);
  const [amount, setAmount] = useState<string | number>(mode === 'button' ? propAmount || 0 : '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cardBrand, setCardBrand] = useState('');
  const [lastFourDigits, setLastFourDigits] = useState('');
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propAmount !== undefined) {
      setAmount(propAmount);
    }
  }, [propAmount]);

  useEffect(() => {
    let cardInstance: SquareCard | null = null;
    let attempts = 0;
    const maxAttempts = 50;

    const initializeSquare = async () => {
      if (!window.Square) {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(initializeSquare, 100);
        } else {
          setErrorMessage('Failed to load Square SDK. Please refresh the page.');
        }
        return;
      }

      if (!squareAppId || !squareLocationId ||
          squareAppId.includes('YOUR_') ||
          squareLocationId.includes('YOUR_')) {
        setErrorMessage('Square payment is not configured yet. Please contact support or set up Square credentials in .env.local');
        return;
      }

      try {
        const payments = window.Square.payments(squareAppId, squareLocationId);
        cardInstance = await payments.card();
        if (cardContainerRef.current) {
          await cardInstance.attach(cardContainerRef.current);

          cardInstance.addEventListener('cardBrandChanged', (event: any) => {
            if (event.cardBrand) {
              setCardBrand(event.cardBrand);
            }
          });

          setCard(cardInstance);
        }
      } catch (error) {
        console.error('Error initializing Square:', error);
        setErrorMessage('Failed to initialize payment form. Please refresh the page.');
      }
    };

    initializeSquare();

    return () => {
      if (cardInstance) {
        cardInstance.destroy();
      }
    };
  }, [squareAppId, squareLocationId]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const formatAmount = (amt: string | number): string => {
    const numAmount = parseFloat(amt.toString());
    return isNaN(numAmount) ? '0.00' : numAmount.toFixed(2);
  };

  const handlePayClick = async () => {
    setErrorMessage('');
    setPaymentStatus(null);

    const numAmount = parseFloat(amount.toString());
    if (!numAmount || numAmount <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }

    if (!card) {
      setErrorMessage('Payment form not ready. Please wait or refresh the page.');
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        setLastFourDigits(result.token.details?.card?.last4 || '****');
        setCardBrand(result.token.details?.card?.brand || 'Card');
        setShowConfirmation(true);
      } else {
        let errorMsg = 'Card validation failed';
        if (result.errors) {
          errorMsg = result.errors.map((error: any) => error.message).join(', ');
        }
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error('Tokenization error:', error);
      setErrorMessage('Error processing card information. Please try again.');
    }
  };

  const handleConfirmPayment = async () => {
    setShowConfirmation(false);
    setIsProcessing(true);
    setErrorMessage('');
    setPaymentStatus(null);

    if (!card) {
      setErrorMessage('Payment form not ready.');
      setIsProcessing(false);
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        const endpoint = apiUrl ? `${apiUrl}/api/process-payment` : '/api/process-payment';
        console.log('Sending payment to:', endpoint);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: parseFloat(amount.toString()),
          }),
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setPaymentStatus('success');
          if (onSuccess) {
            onSuccess(data.payment);
          }
        } else {
          setPaymentStatus('error');
          setErrorMessage(data.error || 'Payment failed. Please try again.');
          if (onError) {
            onError(new Error(data.error || 'Payment failed'));
          }
        }
      } else {
        setPaymentStatus('error');
        const errorMsg = result.errors
          ? result.errors.map((e: any) => e.message).join(', ')
          : 'Card validation failed';
        setErrorMessage(errorMsg);
        if (onError) {
          onError(new Error(errorMsg));
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');

      // Provide more specific error message
      let errorMsg = 'Network error. Please check your connection and try again.';
      if (error instanceof Error) {
        if (error.message.includes('API responded')) {
          errorMsg = 'Payment service unavailable. Please try again later.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMsg = 'Cannot connect to payment service. Make sure the server is running.';
        }
      }

      setErrorMessage(errorMsg);
      if (onError) {
        onError(error as Error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleReset = () => {
    setPaymentStatus(null);
    setErrorMessage('');
    if (mode === 'input') {
      setAmount('');
    }
  };

  // Prevent body scroll when component is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="payment-modal-overlay">
      <div className="payment-form-container">
        <div className="payment-form">
        <h2 className="payment-title">Payment</h2>

        {mode === 'input' ? (
          <div className="form-group">
            <label htmlFor="amount">Amount (USD)</label>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              disabled={isProcessing || paymentStatus === 'success'}
              className="amount-input"
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Amount</label>
            <div className="amount-display">${formatAmount(amount)}</div>
          </div>
        )}

        <div className="form-group">
          <label>Card Details</label>
          <div ref={cardContainerRef} id="card-container" className="card-container"></div>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <div className="success-text">Payment Successful!</div>
            <div className="success-amount">${formatAmount(amount)}</div>
            <button onClick={handleReset} className="btn btn-secondary">
              Make Another Payment
            </button>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="error-status">
            <div className="error-icon">✗</div>
            <div className="error-text">Payment Failed</div>
            <button onClick={handleReset} className="btn btn-secondary">
              Try Again
            </button>
          </div>
        )}

        {!paymentStatus && (
          <button
            onClick={handlePayClick}
            disabled={isProcessing || !card}
            className="btn btn-primary"
          >
            {isProcessing ? 'Processing...' : `Pay $${formatAmount(amount)}`}
          </button>
        )}
      </div>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Confirm Payment</h3>
            <div className="modal-body">
              <div className="confirmation-item">
                <span className="confirmation-label">Amount:</span>
                <span className="confirmation-value">${formatAmount(amount)}</span>
              </div>
              <div className="confirmation-item">
                <span className="confirmation-label">Card:</span>
                <span className="confirmation-value">
                  {cardBrand} ****{lastFourDigits}
                </span>
              </div>
            </div>
            <div className="modal-actions">
              <button
                onClick={handleCancelConfirmation}
                className="btn btn-secondary"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="btn btn-primary"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default PaymentForm;
