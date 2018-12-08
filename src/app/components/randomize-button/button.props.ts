export type BUTTON = {
  type: string;
  buttonText: string;
  helpText: string;
};

export namespace BUTTONS {
  export enum SHUFFLE {
    type = "shuffle",
    buttonText = "Randomize",
    helpText = "Randomize the movie ratings!"
  }
  export enum STOP {
    type = "stop",
    buttonText = "Stop",
    helpText = "Stop randomizing Movies"
  }
}
