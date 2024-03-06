function Modal ({setIsOpen, children}) {

    return (
                <div id="modalID" className="flex justify-center items-center h-screen bg-indigo-200" 
                    onClick={(e)=>{
                        if( e.target.id === "modalID"){
                            setIsOpen(false);
                        }
                    
                    }}>
                    <div className="bg-indigo-300  absolute shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={ () => { setIsOpen(false);}}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {children}
                    </div>
                </div>
   
    );
};

export default Modal;