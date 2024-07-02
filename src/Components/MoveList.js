import { Box } from "@mui/material";
import { Fragment } from "react";

/**
 * Processes a string of moves and returns an array of arrays of moves
 * @param {String} movesString 
 * @returns 
 */
function MoveList({movesString}) {
    const moves = movesString.split(' ').reverse();
    let movesArray = [];

    while (moves[0]) {
        movesArray.push({
            moveNumber: moves.pop(),
            whiteMove: moves.pop(),
            blackMove: moves.pop() || ''
        });
    }

    return (
        <Box sx={{minWidth: '100px'}}>
            {movesArray.map((moveLine, index) =>
                <Fragment key={index}>
                    <p>{moveLine.moveNumber} {moveLine.whiteMove} {moveLine.blackMove}</p>
                </Fragment>                
            )}
        </Box>
    );
}

export default MoveList;