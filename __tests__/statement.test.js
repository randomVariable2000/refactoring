import { describe, expect, it } from "vitest";
import { statement } from "../statement";

describe('1', () => {
    it('1', () => {
        let res = statement(
            {
                "customer": "BigCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 55
                    }
                ]
            },
            {
                "hamlet": { "name": "Hamlet", "type": "tragedy" }
            }
        )

        expect(res).toMatchInlineSnapshot(`
          "Statement for BigCo
           Hamlet: $650.00 (55 seats)
          Amount owed is $650.00
          You earned 25 credits
          "
        `)
    })

    it('2', () => {
        let res = statement(
            {
                "customer": "BigCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 55
                    },
                    {
                        "playID": "as-like",
                        "audience": 35
                    },
                    {
                        "playID": "othello",
                        "audience": 40
                    }
                ]
            },
            {
                "hamlet": { "name": "Hamlet", "type": "tragedy" },
                "as-like": { "name": "As You Like It", "type": "comedy" },
                "othello": { "name": "Othello", "type": "tragedy" }
            }
        )

        expect(res).toMatchInlineSnapshot(`
          "Statement for BigCo
           Hamlet: $650.00 (55 seats)
           As You Like It: $580.00 (35 seats)
           Othello: $500.00 (40 seats)
          Amount owed is $1,730.00
          You earned 47 credits
          "
        `)
    })
})