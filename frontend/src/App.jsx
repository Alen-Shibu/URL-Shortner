import QRCode from "react-qr-code"
import QRCodeGenerator from 'qrcode'
import axios from 'axios'
import { useState } from "react"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [qrImage, setQrImage] = useState('')

  const handleShorten = async() => {
    try {
      if(!url) return;

      const res = await axios.post(`${API_BASE_URL}/shorten`,{
        originalUrl:url
      })

      const newUrl = res.data.shortUrl

      setShortUrl(newUrl)
      setCopied(false)

      const qr = await QRCodeGenerator.toDataURL(newUrl)
      setQrImage(qr)
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(()=> setCopied(false),2000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-4xl font-bold mb-6">URL Shortner</h1>
      <div className="flex flex-col gap-3 w-full max-w-3xl">
        <input className="input input-success w-full" type="text" placeholder="Enter long URL" value={url} onChange={(e)=> setUrl(e.target.value)}/>
        <button className="btn btn-primary w-full sm:auto" onClick={handleShorten}>Shorten</button>
      </div>
      {
        shortUrl && (
          <div className="flex flex-col gap-3 w-full max-w-3xl text-center items-center">
            <p className="font-medium mb-2">Your Shortened URL: </p>
            <a target="_blank" className="link link-primary break-all" href={shortUrl}>{shortUrl}</a>
            <button onClick={handleCopy} className={`btn w-full mt-2 ${copied ? "btn-success" : "btn-secondary"}`}>
              {copied ? "Copied!" : "Copy"}
            </button>

            <div className="bg-white p-4 rounded-lg mt-6 shadow flex flex-col items-center">
              <p className="mb-2 text-center font-semibold text-gray-800">Scan QR Code: </p>
              <QRCode value={shortUrl} size={180} />
            </div>
            {
              qrImage && (
                <a href={qrImage} download='qr-code.png' className="btn btn-accent mt-3 w-full">
                  Download QR Code!
                </a>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default App
