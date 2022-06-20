import { And, Or, Compare, Val } from "./logic.js"
// import * as logic from "./logic.js"

console.log(
    And(
        Compare.Equal(
            "test",
            "test"
        ),
        Or(
            Or(
                Compare.Equal(
                    Val("test"),
                    1
                ),
                Compare.Equal(
                    Val("test"),
                    2
                )
            ),
            function(obj) {
                return true
            }
        )
    )
    .test({
        test: 3
    })
)