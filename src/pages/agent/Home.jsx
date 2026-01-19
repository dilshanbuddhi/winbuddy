import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    // Get today date
    const today = new Date().toLocaleDateString('en-GB')

    return (
        <div className="min-h-screen bg-white relative flex items-start justify-center px-4">

            {/* Date - Top Right */}
            <div className="absolute top-6 right-8 text-sm text-gray-600">
                Date: {today}
            </div>

            <div className="w-full max-w-md text-center">

                {/* Logo */}
                <div className="flex flex-col items-center">
                    <img
                        src="/evoplay.svg"
                        alt="Logo"
                        className="h-60 w-auto"
                    />

                    <h2 className="-mt-20 text-xl font-semibold text-[#414759]">
                        Welcome
                    </h2>
                </div>


                {/* Buttons */}
                <div className="space-y-4 mt-28">
                    <button
                        onClick={() => navigate('/seller')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Seller Console
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Agent Portal
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Home
