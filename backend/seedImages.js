const fs = require('fs').promises
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const Image = require('./models/imageModel')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}

const uploadImage = async (filePath, category) => {
    try {
        const data = await fs.readFile(filePath)
        const filename = path.basename(filePath)
        
        // Detect content type based on file extension
        const ext = path.extname(filename).toLowerCase()
        let contentType = 'image/jpeg'
        if (ext === '.png') contentType = 'image/png'
        else if (ext === '.gif') contentType = 'image/gif'
        else if (ext === '.webp') contentType = 'image/webp'
        else if (ext === '.svg') contentType = 'image/svg+xml'
        
        const image = new Image({
            filename,
            contentType,
            data,
            category
        })
        
        await image.save()
        console.log(`✓ Uploaded: ${filename} (${category})`)
        return image
    } catch (err) {
        console.error(`✗ Failed to upload ${filePath}:`, err.message)
        return null
    }
}

const uploadDirectory = async (dirPath, category) => {
    try {
        const files = await fs.readdir(dirPath)
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
        
        for (const file of files) {
            const filePath = path.join(dirPath, file)
            const stat = await fs.stat(filePath)
            
            if (stat.isDirectory()) {
                await uploadDirectory(filePath, `${category}/${file}`)
            } else {
                const ext = path.extname(file).toLowerCase()
                if (imageExtensions.includes(ext)) {
                    await uploadImage(filePath, category)
                }
            }
        }
    } catch (err) {
        console.error(`Error processing directory ${dirPath}:`, err.message)
    }
}

const seedImages = async () => {
    try {
        await connectDB()
        
        // Clear existing images
        const deleteCount = await Image.deleteMany({})
        console.log(`\nCleared ${deleteCount.deletedCount} existing images\n`)
        
        // Define base path relative to backend folder
        const frontendPath = path.join(__dirname, '../frontend/src/Images')
        
        console.log('Starting image upload...\n')
        
        // Upload banner images
        await uploadDirectory(path.join(frontendPath, 'banner'), 'banner')
        
        // Upload product images by category
        await uploadDirectory(path.join(frontendPath, 'products'), 'products')
        
        // Upload standalone images
        const standaloneFiles = ['logo.svg', 'signin.gif', 'forgotpasswnedSend.gif', 'sampleImage.jpg']
        for (const file of standaloneFiles) {
            const filePath = path.join(frontendPath, file)
            try {
                await fs.access(filePath)
                await uploadImage(filePath, 'general')
            } catch (err) {
                // File doesn't exist, skip
            }
        }
        
        console.log('\n✓ Image seeding completed!')
        
        // Display summary
        const total = await Image.countDocuments()
        const byCategory = await Image.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ])
        
        console.log(`\n📊 Summary:\nTotal images: ${total}`)
        byCategory.forEach(cat => {
            console.log(`  - ${cat._id}: ${cat.count} images`)
        })
        
        mongoose.connection.close()
    } catch (err) {
        console.error('Seeding error:', err)
        process.exit(1)
    }
}

seedImages()
