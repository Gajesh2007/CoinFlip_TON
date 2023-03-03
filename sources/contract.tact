import "@stdlib/deploy";

message Flip {
    side: Int;
}

contract CoinFlip with Deployable {
    owner: Address;
    fees: Int;
 
    init(owner: Address) {
        self.owner = owner;
    }
 
    receive(msg: Flip) {
        require(msg.side == 1 || msg.side == 0, "invalid bet");

        let ctx = context();
        bet: Int = ctx.value;
        randomNumber: Int = randomInt();
        randomNumberFlipped: Int = randomNumber % 2;

        if (randomNumberFlipped == msg.side) {
            let to: Address = ctx.sender();
            let value = bet * 1.9;
            self.fees = bet * 0.1;
            send(SendParameters{
                to: to,
                value: value, 
                mode: SendIgnoreErrors, 
                bounce: true, 
                body: "You Won!".asComment()
            });
        } else {
            self.fees = bet * 0.1;

            reply("You Lost. Try Again Later".asComment());
        }
    }

    receive("withdraw_fees") {
        require(context().sender == owner, "you're not the owner");

        let to: Address = ctx.sender();
        let value = fees;
        send(SendParameters{
            to: to,
            value: value, 
            mode: SendIgnoreErrors, 
            bounce: true, 
            body: "Sent the Fees!".asComment()
        });

        self.fees = 0;
    }
 
    get fun owner(): Address {
        return self.owner;
    }
}