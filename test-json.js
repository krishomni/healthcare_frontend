const fs = require('fs')
const path = require('path')

const dataPath = path.join(process.cwd(), 'data', 'user-data.json')

console.log('🔍 Testing JSON file operations...')
console.log('📍 File path:', dataPath)
console.log('📁 Current directory:', process.cwd())

// Test 1: Check if data directory exists
const dataDir = path.dirname(dataPath)
if (!fs.existsSync(dataDir)) {
  console.log('📁 Creating data directory...')
  fs.mkdirSync(dataDir, { recursive: true })
} else {
  console.log('✅ Data directory exists')
}

// Test 2: Try to write test data
try {
  const testData = { test: 'Hello World', timestamp: new Date().toISOString() }
  fs.writeFileSync(dataPath, JSON.stringify(testData, null, 2))
  console.log('✅ Write test successful')
} catch (error) {
  console.error('❌ Write test failed:', error)
}

// Test 3: Try to read data back
try {
  const data = fs.readFileSync(dataPath, 'utf8')
  const parsed = JSON.parse(data)
  console.log('✅ Read test successful:', parsed)
} catch (error) {
  console.error('❌ Read test failed:', error)
}