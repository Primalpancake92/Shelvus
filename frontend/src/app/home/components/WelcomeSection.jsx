import useGetMe from "../../../features/users/hooks/useGetMe";

export default function WelcomeSection() {
    const { me, loading, error } = useGetMe();

    return (
        <div className="relative flex flex-col items-center justify-center gap-5
        bg-secondary backdrop-blur-md p-15 rounded-4xl">
            <h1 className="text-4xl font-bold text-center">
                {loading ? "Loading..." : me ? `Welcome, ${me.first_name}!` : "Welcome!"}
            </h1>
            <p className="text-lg text-center">
                Explore our library and discover a world of knowledge at your fingertips.
            </p>
        </div>
    )
}

