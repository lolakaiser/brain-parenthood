// Script: clear-module1-progress.js
// Clears Module 1 progress and answers for the lolakaiser user using the native mongodb driver.

const { MongoClient } = require('mongodb');

const MONGODB_URI =
  'mongodb+srv://lolakaiser:Kai5er%409882@brainparenthood.afwedfw.mongodb.net/brain-parenthood?retryWrites=true&w=majority&appName=BrainParenthood';

async function main() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB.');

    const db = client.db('brain-parenthood');
    const users = db.collection('users');

    // Find the user first so we can report what we're clearing
    const user = await users.findOne({
      $or: [
        { username: { $regex: /lola/i } },
        { email: { $regex: /lola/i } },
      ],
    });

    if (!user) {
      console.error('No user found matching "lola". Aborting.');
      return;
    }

    console.log(`Found user:`);
    console.log(`  _id:      ${user._id}`);
    console.log(`  email:    ${user.email}`);
    console.log(`  username: ${user.username}`);
    console.log(`  name:     ${user.name}`);

    // Show current state before clearing
    const currentCompleted = user.moduleProgress?.completedModules ?? [];
    const currentModule1Answers = user.moduleAnswers?.get
      ? user.moduleAnswers.get('1')          // Map object (unlikely in raw driver)
      : (user.moduleAnswers?.['1'] ?? null); // Plain object (typical in raw driver)

    console.log(`\nCurrent completedModules: [${currentCompleted.join(', ')}]`);
    console.log(`Current module 1 answers:`, JSON.stringify(currentModule1Answers, null, 2));

    // Build the update:
    //   - Remove 1 from moduleProgress.completedModules
    //   - Unset moduleAnswers.1
    const result = await users.updateOne(
      { _id: user._id },
      {
        $pull: { 'moduleProgress.completedModules': 1 },
        $unset: { 'moduleAnswers.1': '' },
      }
    );

    console.log(`\nUpdate result:`);
    console.log(`  matchedCount:  ${result.matchedCount}`);
    console.log(`  modifiedCount: ${result.modifiedCount}`);

    // Verify
    const updated = await users.findOne({ _id: user._id });
    const newCompleted = updated.moduleProgress?.completedModules ?? [];
    const newModule1Answers = updated.moduleAnswers?.['1'] ?? null;

    console.log(`\nAfter update:`);
    console.log(`  completedModules: [${newCompleted.join(', ')}]`);
    console.log(`  module 1 answers: ${JSON.stringify(newModule1Answers)}`);

    if (!newCompleted.includes(1) && newModule1Answers === null) {
      console.log('\nSuccess: Module 1 progress and answers have been cleared.');
    } else {
      console.warn('\nWarning: Something may not have cleared correctly. Check the output above.');
    }
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
