// First, let's check if all your components exist and are properly exported
// Create this as debug-components.js in your project root

console.log('🔍 Debugging Component Imports...\n')

// Check if components directory exists
const fs = require('fs')
const path = require('path')

const componentsDir = path.join(process.cwd(), 'components')
const adminDir = path.join(componentsDir, 'admin')

console.log('📁 Checking component directories:')
console.log('- components/', fs.existsSync(componentsDir) ? '✅ EXISTS' : '❌ MISSING')
console.log('- components/admin/', fs.existsSync(adminDir) ? '✅ EXISTS' : '❌ MISSING')

// Check main components
const mainComponents = [
  'Navbar.js',
  'ScrollToTop.js', 
  'NotesWidget.js'
]

console.log('\n📦 Checking main components:')
mainComponents.forEach(comp => {
  const filePath = path.join(componentsDir, comp)
  console.log(`- ${comp}:`, fs.existsSync(filePath) ? '✅ EXISTS' : '❌ MISSING')
})

// Check admin components
const adminComponents = [
  'ServicesEditor.js',
  'BlogEditor.js',
  'GalleryEditor.js'
]

console.log('\n📦 Checking admin components:')
adminComponents.forEach(comp => {
  const filePath = path.join(adminDir, comp)
  console.log(`- admin/${comp}:`, fs.existsSync(filePath) ? '✅ EXISTS' : '❌ MISSING')
})

// Check pages
const pagesDir = path.join(process.cwd(), 'pages')
const adminPagesDir = path.join(pagesDir, 'admin')
const apiDir = path.join(pagesDir, 'api')
const apiAdminDir = path.join(apiDir, 'admin')

console.log('\n📄 Checking pages:')
console.log('- pages/', fs.existsSync(pagesDir) ? '✅ EXISTS' : '❌ MISSING')
console.log('- pages/admin/', fs.existsSync(adminPagesDir) ? '✅ EXISTS' : '❌ MISSING')
console.log('- pages/api/', fs.existsSync(apiDir) ? '✅ EXISTS' : '❌ MISSING')
console.log('- pages/api/admin/', fs.existsSync(apiAdminDir) ? '✅ EXISTS' : '❌ MISSING')

const criticalFiles = [
  'pages/index.js',
  'pages/admin/login.js',
  'pages/admin/dashboard.js',
  'pages/api/user-data.js',
  'pages/api/admin/login.js',
  'pages/api/admin/data.js'
]

console.log('\n🔥 Critical files:')
criticalFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  console.log(`- ${file}:`, fs.existsSync(filePath) ? '✅ EXISTS' : '❌ MISSING')
})

console.log('\n💡 Run this with: node debug-components.js')