// $lib/server/square.ts

import { SQUARE_PROD_ACCESS_TOKEN, SQUARE_SANBDOX_ACCESS_TOKEN, SQUARE_ENVIRONMENT } from "$env/static/private";
import { SquareClient, SquareEnvironment } from "square";

const accessToken = SQUARE_ENVIRONMENT === 'production' ? SQUARE_PROD_ACCESS_TOKEN : SQUARE_SANBDOX_ACCESS_TOKEN;
export const square = new SquareClient({
    token: accessToken,
    environment: SQUARE_ENVIRONMENT == 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});