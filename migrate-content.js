import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { basename, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// --- Configuration ---
// Ensure these environment variables are set or replace with actual values for the run
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'yourprojectid'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN // Requires a token with write permissions

if (!token) {
  console.error('Error: SANITY_API_TOKEN is required to run this script.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// --- Data Extraction ---

const careersData = {
  _type: 'careersPage',
  hero: {
    title: 'Join Our Global Team',
    description: "Build your career with one of Singapore's leading logistics companies. We're looking for passionate individuals to join our mission of connecting the world through exceptional logistics solutions.",
  },
  benefits: {
    title: 'Why Choose GGL?',
    description: 'At GGL, we believe our people are our greatest asset. We foster an environment where talent thrives and careers flourish.',
    items: [
      { title: "Global Opportunities", description: "Work with diverse teams across multiple countries.", icon: "Globe" },
      { title: "Career Growth", description: "Continuous learning and development programs.", icon: "TrendingUp" },
      { title: "Inclusive Culture", description: "A workplace that values every individual's contribution.", icon: "Heart" }
    ]
  },
  cta: {
    title: 'Ready to Start Your Journey?',
    description: "Don't see the right position? Send us your resume and we'll keep you in mind for future opportunities.",
  }
}

const lclServiceData = {
  _type: 'service',
  title: 'LCL Consolidation Services',
  slug: { _type: 'slug', current: 'lcl-consolidation' },
  description: 'Cost-effective consolidation solutions for your smaller shipments',
  features: [
    "Collecting smaller shipments from multiple clients",
    "Combining them into a single container at origin",
    "Managing customs clearance and documentation",
    "Ensuring secure and timely deconsolidation and final delivery",
    "Real-time tracking and shipment visibility",
    "Competitive pricing for cost-effective solutions"
  ],
  globalHubs: [
    "Singapore",
    "Malaysia",
    "Sri Lanka",
    "Dubai",
    "Mumbai (India)",
    "Chennai (India)"
  ],
  // Converting HTML paragraphs to Portable Text blocks
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "GGL is a leading LCL consolidator with a strong global footprint, offering reliable groupage services across key trade lanes—including North America, the UK, the Middle East, the Indian Subcontinent, Southeast Asia, and the Far East. Our LCL services are supported by responsive customer service teams and delivered at highly competitive rates, ensuring efficiency and peace of mind for our clients." }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "Strategically positioned in major transshipment hubs—Singapore, Malaysia, Sri Lanka, and Dubai—GGL offers direct, weekly sailings to major global destinations. These prime locations enhance our ability to provide fast, flexible, and cost-effective consolidation services across continents." }]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "We are excited to announce the launch of GGL's operations in India, starting with our first office in Mumbai. Expansion plans are already underway with upcoming offices in Chennai and key Inland Container Depots (ICDs) such as New Delhi, Pune, and Bangalore. This move marks a major milestone in our growth and strengthens our regional service capabilities." }]
    }
  ],
  // Image path relative to project root (assuming standard Vite structure)
  _localImage: 'public/lovable-uploads/lcl.png'
}

// --- Helper Functions ---

async function uploadImage(filePath) {
  const absolutePath = join(projectRoot, filePath)
  if (!existsSync(absolutePath)) {
    console.warn(`Warning: Image file not found at ${absolutePath}. Skipping upload.`)
    return null
  }

  console.log(`Uploading image: ${filePath}...`)
  try {
    const imageAsset = await client.assets.upload('image', createReadStream(absolutePath), {
      filename: basename(filePath)
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      },
      hotspot: true
    }
  } catch (error) {
    console.error(`Failed to upload image ${filePath}:`, error.message)
    return null
  }
}

async function migrateCareers() {
  console.log('Migrating Careers Page...')
  // Careers page doesn't have local images in the default content provided, 
  // but we structure the call to createOrReplace.
  // We use a deterministic ID 'careersPage' to ensure singleton-like behavior.
  const doc = { ...careersData, _id: 'careersPage' }
  
  try {
    const result = await client.createOrReplace(doc)
    console.log(`Successfully migrated Careers Page (ID: ${result._id})`)
  } catch (error) {
    console.error('Failed to migrate Careers Page:', error.message)
  }
}

async function migrateLCLService() {
  console.log('Migrating LCL Consolidation Service...')
  
  let imageObject = null
  if (lclServiceData._localImage) {
    imageObject = await uploadImage(lclServiceData._localImage)
  }

  const doc = {
    ...lclServiceData,
    mainImage: imageObject,
    _id: 'service-lcl-consolidation' // Deterministic ID
  }
  
  // Remove the temporary _localImage field
  delete doc._localImage

  try {
    const result = await client.createOrReplace(doc)
    console.log(`Successfully migrated LCL Service (ID: ${result._id})`)
  } catch (error) {
    console.error('Failed to migrate LCL Service:', error.message)
  }
}

// --- Execution ---

async function run() {
  await migrateCareers()
  await migrateLCLService()
  console.log('Migration complete.')
}

run()