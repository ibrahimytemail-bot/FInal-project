import SummaryApi from "../common"

const uploadImage = async(image) => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("filename", image.name)
    formData.append("category", "product")
    
    try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))
        
        const dataResponse = await fetch(SummaryApi.uploadImage.url, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Authorization': token ? token.split('=')[1] : ''
            },
            body: formData
        })

        const result = await dataResponse.json()
        
        if (result.success) {
            // Return the URL to access the image from database
            return {
                secure_url: `${process.env.REACT_APP_BACKEND_URL}${result.data.url}`,
                url: `${process.env.REACT_APP_BACKEND_URL}${result.data.url}`,
                id: result.data.id
            }
        } else {
            throw new Error(result.message || 'Upload failed')
        }
    } catch (error) {
        console.error('Upload error:', error)
        throw error
    }
}

export default uploadImage