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

        let ctx: Context = context();
        let bet: Int = ctx.value;
        let randomNumber: Int = randomInt();
        let randomNumberFlipped: Int = randomNumber % 2;

        if (randomNumberFlipped == msg.side) {
            let to: Address = ctx.sender;
            let value: Int = bet + (bet / 90);
            self.fees = bet / 10;
            send(SendParameters{
                to: to,
                value: value, 
                mode: SendIgnoreErrors, 
                bounce: true, 
                body: "You Won!".asComment()
            });
        } else {
            self.fees = bet / 10;

            reply("You Lost. Try Again Later".asComment());
        }
    }

    receive("withdraw_fees") {
        require(context().sender == self.owner, "you're not the owner");

        let to: Address = context().sender;
        let value: Int = self.fees;
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