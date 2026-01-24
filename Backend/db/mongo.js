const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/goblin_designs';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

const designSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'rare',
    },
    theme: {
      type: String,
      default: 'goblin',
    },
    powerLevel: {
      type: Number,
      min: 1,
      max: 100,
      default: 50,
    },
  },
  { timestamps: true }
);

const Design = mongoose.model('Design', designSchema);

async function ensureSeedDesigns() {
  try {
    const count = await Design.countDocuments();
    if (count > 0) return;

    await Design.insertMany([
      {
        name: 'Shadow Raider Goblin',
        description:
          'Stealth-focused goblin with smoky trails and shadow-step animation.',
        rarity: 'epic',
        theme: 'shadow',
        powerLevel: 82,
      },
      {
        name: 'Crystal Hoarder Goblin',
        description:
          'Glowing crystal armor with reflective highlights and loot glow.',
        rarity: 'legendary',
        theme: 'crystal',
        powerLevel: 95,
      },
      {
        name: 'Inferno Scout Goblin',
        description:
          'Fast scout unit leaving ember particles and heat distortion.',
        rarity: 'rare',
        theme: 'fire',
        powerLevel: 76,
      },
    ]);

    console.log('Seeded default Goblin designs into MongoDB');
  } catch (err) {
    console.error('Error seeding designs:', err.message);
  }
}

ensureSeedDesigns();

module.exports = {
  Design,
};

