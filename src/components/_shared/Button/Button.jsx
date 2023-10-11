
function Button({btnClass, btnName, disabled, onClick, data}) {
    return (
        <button 
            className={btnClass} 
            disabled={disabled} 
            onClick={onClick}
            data-id={data}
        >
            {btnName}
        </button>
    )
}

export default Button;