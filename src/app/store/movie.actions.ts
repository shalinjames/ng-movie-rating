export class SetInitialState {
  static readonly type = "[Movie] set initial state";
}

export class UpdateMovie {
  static readonly type = "[Movie] Update movie by id";
  constructor(public movie) {}
}
