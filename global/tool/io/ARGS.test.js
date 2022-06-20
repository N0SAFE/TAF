TAF.io.ARGS.set(
    import.meta.url, {
        test: 1
    }
).setConstraint(
    import.meta.url, [{
        path: "test",
        types: [Number],
        default: 2
    }, {
        path: ["other", "test"],
        types: [String, undefined]
    }, {
        path: ["other", "ui"],
        types: undefined,
        default: new TAF.io.ARGS.Undefined
    }]
).get(
    import.meta.url
)

// this return zero error because all the constraint is respected