import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type Flip = {
    $$type: 'Flip';
    side: bigint;
}

export function storeFlip(src: Flip) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1217181956, 32);
        b_0.storeInt(src.side, 257);
    };
}

export function loadFlip(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1217181956) { throw Error('Invalid prefix'); }
    let _side = sc_0.loadIntBig(257);
    return { $$type: 'Flip' as const, side: _side };
}

function loadTupleFlip(source: TupleReader) {
    let _side = source.readBigNumber();
    return { $$type: 'Flip' as const, side: _side };
}

function storeTupleFlip(source: Flip) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.side);
    return builder.build();
}

function dictValueParserFlip(): DictionaryValue<Flip> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFlip(src)).endCell());
        },
        parse: (src) => {
            return loadFlip(src.loadRef().beginParse());
        }
    }
}

 type CoinFlip_init_args = {
    $$type: 'CoinFlip_init_args';
    owner: Address;
}

function initCoinFlip_init_args(src: CoinFlip_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function CoinFlip_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECEwEAA2UAART/APSkE/S88sgLAQIBYgIDAqbQAdDTAwFxsMABkX+RcOIB+kAiUFVvBPhh7UTQ1AH4YtIAAZz6QAEBgQEB1wBZbBKOh/pAAQHR2zziWts8MMj4QgHMfwHKAFlZzxaBAQHPAMntVBEEAgEgDxAEuO2i7ftwIddJwh+VMCDXCx/eApJbf+AhghBIjLkEuo+zMdMfAYIQSIy5BLry4IGBAQHXAAExMYFDLyHAASLAALHy9PhBbyQwMts8qTgAUAO64w9/4CGCEJRqmLa6BQYHCAAc+ENul/gl+BV/+GPe+BACSiCAWqkEUhCgAXqpBHJ/i4WW91IFdvbiGNs8EEUQNRRDMG1t2zwLDAJIMXqpBI0GVlvdSBMb3N0LiBUcnkgQWdhaW4gTGF0ZXKDbPNs8CwkCXI6jMdMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8nbPH/gAcAAkTDjDXAJCgEm+EFvJBAjXwN/cFADgEIBbW3bPAwCxPkBgvBq3eF2Blm7P9tNRgPBX9ScnXN9q1Crg2mQtnk5is3MNrqPOoIA0P74QW8kECNfAyPHBfL0+EFvJBAjXwNyf4vlNlbnQgdGhlIEZlZXMhjbPBA0FEMwbW3bPHB/2zHgCwwBQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMQ0B9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFusw4AuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwAwnH8BygABIG7y0IABzJUxcAHKAOLJAfsAAku+KO9qJoagD8MWkAAM59IACAwICA64AstglHQ/0gAIDo7Z5xbZ5BESAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwAAm0AAjA=');
    const __system = Cell.fromBase64('te6cckECFQEAA28AAQHAAQEFoV3lAgEU/wD0pBP0vPLICwMCAWIIBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwCS74o72omhqAPwxaQAAzn0gAIDAgIDrgCy2CUdD/SAAgOjtnnFtnkFAcAAjACptAB0NMDAXGwwAGRf5Fw4gH6QCJQVW8E+GHtRNDUAfhi0gABnPpAAQGBAQHXAFlsEo6H+kABAdHbPOJa2zwwyPhCAcx/AcoAWVnPFoEBAc8Aye1UFAkEuO2i7ftwIddJwh+VMCDXCx/eApJbf+AhghBIjLkEuo+zMdMfAYIQSIy5BLry4IGBAQHXAAExMYFDLyHAASLAALHy9PhBbyQwMts8qTgAUAO64w9/4CGCEJRqmLa6Ew4MCgJcjqMx0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yds8f+ABwACRMOMNcA0LAsT5AYLwat3hdgZZuz/bTUYDwV/UnJ1zfatQq4NpkLZ5OYrNzDa6jzqCAND++EFvJBAjXwMjxwXy9PhBbyQQI18Dcn+L5TZW50IHRoZSBGZWVzIY2zwQNBRDMG1t2zxwf9sx4BEPAkgxeqkEjQZWW91IExvc3QuIFRyeSBBZ2FpbiBMYXRlcoNs82zwRDQEm+EFvJBAjXwN/cFADgEIBbW3bPA8CSiCAWqkEUhCgAXqpBHJ/i4WW91IFdvbiGNs8EEUQNRRDMG1t2zwRDwH2yHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkx/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6zEAAwnH8BygABIG7y0IABzJUxcAHKAOLJAfsAAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DESALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMAHPhDbpf4JfgVf/hj3vgQAAJtFH2Bhg==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initCoinFlip_init_args({ $$type: 'CoinFlip_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const CoinFlip_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    17199: { message: `invalid bet` },
    53502: { message: `you're not the owner` },
}

export class CoinFlip implements Contract {
    
    static async init(owner: Address) {
        return await CoinFlip_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await CoinFlip_init(owner);
        const address = contractAddress(0, init);
        return new CoinFlip(address, init);
    }
    
    static fromAddress(address: Address) {
        return new CoinFlip(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: CoinFlip_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Flip | 'withdraw_fees' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Flip') {
            body = beginCell().store(storeFlip(message)).endCell();
        }
        if (message === 'withdraw_fees') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}