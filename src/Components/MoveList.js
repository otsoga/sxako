import { Box } from "@mui/material";

/**
 * Processes a string of moves and returns an array of arrays of moves
 * @param {String} movesString 
 * @returns 
 */
function MoveList({movesString}) {
    const moves = movesString.split(' ').reverse();
    let movesArray = [];

    while (moves[0]) {
        console.log('moves', moves[0]);
        let moveLine = []
        moveLine.push(moves.pop());
        moveLine.push(moves.pop());

        if (moves[0]) {
            moveLine.push(moves.pop());
        }

        movesArray.push(moveLine);
        console.log('moves Array', movesArray);
    }

    return (
        <Box>

        </Box>
    );
}

export default MoveList;