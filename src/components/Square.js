import React from "react";

export const Square = ({ winnerClass, value, onClick }) => {
    return (
        <>
            <button className={`${winnerClass} square`} onClick={onClick}>
                {value}
            </button>
        </>
    );
};

// Square.PropTypes = {
//     onClick: PropTypes.func.isRequired
// };
