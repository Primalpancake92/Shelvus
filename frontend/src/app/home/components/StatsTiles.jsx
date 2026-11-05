export default function StatsTiles( ) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-15">
            <div className="bg-white backdrop-blur-md p-6 rounded-4xl flex flex-col items-center justify-center gap-3">
                <p className="text-2xl font-bold">100+</p>
                <p className="text-lg text-primary">Books Available</p>
            </div>
            <div className="bg-white backdrop-blur-md p-6 rounded-4xl flex flex-col items-center justify-center gap-3">
                <p className="text-2xl font-bold">50+</p>  
                <p className="text-lg text-primary">Active Users</p>
            </div>
            <div className="bg-white backdrop-blur-md p-6 rounded-4xl flex flex-col items-center justify-center gap-3">

            </div>
            <div className="bg-white backdrop-blur-md p-6 rounded-4xl flex flex-col items-center justify-center gap-3">

            </div>
        </div>
    )
}