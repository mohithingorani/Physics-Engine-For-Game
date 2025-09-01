export type message = {
    type : messageTypes,
    move : movementTypes
}

export enum messageTypes{
    MOVEMENT = "movement"
}

export enum movementTypes{
    LEFT = "left",
    RIGHT = "right",
    JUMP = "jump",
    ATTACK = "attack"
}