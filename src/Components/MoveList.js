import { Box } from "@mui/material";

function MoveList({movesString}) {
    const moves = movesString.split(' ').reverse();
    let movesArray = [];
    while (moves[0]) {
        console.log('moves', moves[0]);
    //         // console.log('in while loop')
    let moveLine = []
        moveLine.push(moves.pop());
        moveLine.push(moves.pop());

    if (moves[0]) {
        moveLine.push(moves.pop());
    }


    //     console.log('moves after popping', moves.slice().reverse());

        movesArray.push(moveLine);

        console.log('moves Array', movesArray);
    }


    return (
            <Box>

            </Box>
    );
}

export default MoveList;