import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

export default function Modal ({ modalName, loading, error, userOperation, 
    onClose }) {
    const navigate = useNavigate();
    let message;

    if (loading) {
        message = <p>Registering user...</p>;
    } else if (userOperation) {
        message = <h2>User has successfully registered</h2>;
    } else if (error) {
        message = <p>Error registering user</p>;
    }
    
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-foreground/60 px-4">
            <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl
            border border-foreground/10 bg-[#f4f3ee] p-8 text-center font-display
            text-foreground shadow-[0_20px_40px_rgba(40,62,53,0.25)]">
                <div className="flex w-14 h-14 items-center justify-center rounded-full
                bg-secondary text-primary">
                    <Icon name="book" className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
                    {modalName}
                </p>
                <div className="flex items-center text-lg font-semibold">
                    {message}
                </div>
                <span>
                    {userOperation ?
                        <span className="flex justify-center items-center
                        gap-3">
                            <button onClick={() => { navigate("/") }}
                            className="mt-2 rounded-full bg-primary px-8
                            py-3 font-semibold text-background hover:bg-[#587464]
                            transition-colors duration-300 ease-in-out 
                            hover:cursor-pointer">
                                Home
                            </button>
                            <button onClick={() => { navigate("/login") }} 
                            className="mt-2 rounded-full bg-secondary px-8
                            py-3 font-semibold text-lg hover:bg-secondary 
                            transition-colors duration-300 hover:cursor-pointer 
                            hover:">
                                Login
                            </button>
                        </span>
                        :
                        <button onClick={onClose} className="mt-2 rounded-full bg-primary px-8
                        py-3 font-semibold text-background hover:bg-[#587464]
                        transition-colors duration-300 ease-in-out hover:cursor-pointer">
                            Close
                        </button>
                    }
                    
                </span>
            </div>
        </div>
    );
}