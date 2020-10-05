import { types, getParent } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import Seller from "./Seller";

const Game = types
  .model("Game", {
    id: types.identifier,
    slug: types.string,
    title: types.string,
    description: types.string,
    price: types.string,
    images: types.array(types.string),
    videos: types.array(types.string),
    preorderable: types.boolean,
    early_access: types.boolean,
    esrb: types.string,
    btc_amount: types.number,
    xmr_amount: types.number,
    default_currency: types.string,
    currency_symbol: types.string,
    seller: types.maybe(Seller),
  })
  .actions((self) => ({
    play() {
      const { selectGame } = getParent(self, 2);
      selectGame(self);
    },
  }));

export default types.compose(BaseUpdate, Game);
