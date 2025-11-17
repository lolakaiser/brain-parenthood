'use client';

export default function TestEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>

      <div className="space-y-4">
        <div className="p-4 bg-green-50 border-2 border-green-500 rounded">
          <h2 className="font-bold text-green-700">✅ Visible in Browser (NEXT_PUBLIC_*):</h2>
          <pre className="mt-2 text-sm">
            NEXT_PUBLIC_SQUARE_APPLICATION_ID: {process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || 'Not set'}
          </pre>
          <pre className="text-sm">
            NEXT_PUBLIC_SQUARE_LOCATION_ID: {process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'Not set'}
          </pre>
        </div>

        <div className="p-4 bg-red-50 border-2 border-red-500 rounded">
          <h2 className="font-bold text-red-700">❌ Hidden from Browser (No prefix):</h2>
          <pre className="mt-2 text-sm">
            SQUARE_ACCESS_TOKEN: {process.env.SQUARE_ACCESS_TOKEN || 'undefined (secure!)'}
          </pre>
          <pre className="text-sm">
            SQUARE_ENVIRONMENT: {process.env.SQUARE_ENVIRONMENT || 'undefined (secure!)'}
          </pre>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-300 rounded">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Even though SQUARE_ACCESS_TOKEN is in your .env.local file,
            it shows as "undefined" here because this code runs in the browser, and Next.js
            doesn't expose server-only variables to the client.
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-300 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">How to Verify:</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Open Chrome DevTools (F12)</li>
          <li>Go to Console tab</li>
          <li>Type: <code className="bg-gray-200 px-1">process.env</code></li>
          <li>You'll only see NEXT_PUBLIC_* variables</li>
        </ol>
      </div>
    </div>
  );
}
