import { Scroll } from "./networks/scroll";
import { getNativeBalance } from "./tasks/native_checker";


async function test1() {
    const addrss: string[] = ['0x240194687ac8A6C1F708631D4A382239D3069Dac', '0xd0557B3150D13Aa37d4a643CEf9e72a3494088fe']
    const res1 = await getNativeBalance(
        Scroll,
        addrss
    )
    // console.log(res1.balances, res1.header)
}

test1();