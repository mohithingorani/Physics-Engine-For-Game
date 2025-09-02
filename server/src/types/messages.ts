export type message = {
    type : messageTypes,
    move : movementTypes,
    player : playerTypes
}

export enum messageTypes{
    MOVEMENT = "movement"
}

export enum playerTypes {
    PLAYER1 = "player1",
    PLAYER2 = "player2"
}

export enum movementTypes{
    LEFT = "left",
    RIGHT = "right",
    JUMP = "jump",
    ATTACK = "attack"
}