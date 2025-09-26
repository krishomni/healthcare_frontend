const fs = require('fs')
const path = require('path')

console.log('🔍 Debugging Gallery & Search Issues...\n')

// Check 1: Does data file exist?
const dataPath = path.join(process.cwd(), 'data', 'user-data.json')
console.log('📍 Looking for data file at:', dataPath)

if (fs.existsSync(dataPath)) {
    console.log('✅ Data file exists')
    
    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        console.log('\n📊 Data Structure Analysis:')
        console.log('- Practice Name:', data.practice?.name || 'MISSING')
        console.log('- Services Count:', data.services?.length || 0)
        console.log('- Blog Posts Count:', data.blogPosts?.length || 0)
        console.log('- Gallery Object:', data.gallery ? 'EXISTS' : 'MISSING')
        
        if (data.gallery) {
            console.log('- Facility Images:', data.gallery.facilityImages?.length || 0)
            console.log('- Before/After Cases:', data.gallery.beforeAfterCases?.length || 0)
            
            // Show first facility image details
            if (data.gallery.facilityImages?.[0]) {
                const first = data.gallery.facilityImages[0]
                console.log('\n🖼️ First Facility Image:')
                console.log('- Caption:', first.caption || 'NO CAPTION')
                console.log('- URL:', first.url || 'NO URL')
                console.log('- Description:', first.description || 'NO DESCRIPTION')
            }
            
            // Show first before/after case
            if (data.gallery.beforeAfterCases?.[0]) {
                const first = data.gallery.beforeAfterCases[0]
                console.log('\n🔄 First Before/After Case:')
                console.log('- Title:', first.title || 'NO TITLE')
                console.log('- Treatment:', first.treatment || 'NO TREATMENT')
                console.log('- Before Image:', first.beforeImage || 'NO BEFORE IMAGE')
                console.log('- After Image:', first.afterImage || 'NO AFTER IMAGE')
            }
        } else {
            console.log('❌ Gallery object is missing from data!')
        }
        
    } catch (error) {
        console.error('❌ Error parsing data file:', error.message)
    }
} else {
    console.log('❌ Data file does not exist')
    console.log('💡 Create it by visiting: http://localhost:3000/api/user-data')
}

console.log('\n🔍 Next Steps:')
console.log('1. Run this script: node debug-data.js')
console.log('2. Check browser console on homepage for debug info')
console.log('3. Check admin dashboard gallery tab')
console.log('4. Visit /api/user-data directly to see API response')