const { ethers } = require("hardhat")
const { time } = require('@openzeppelin/test-helpers')

const toWei = ethers.utils.parseEther;
const toEtherBN = (x) => ethers.BigNumber.from(x.toString());

async function main() {
    let [account] = await ethers.getSigners()

    // let erc20 = await (await ethers.getContractFactory("ERC20Mock")).deploy("Curve", "CRV", toWei("20000"))
    // let veCrv = await (await ethers.getContractFactory("VotingEscrow")).deploy(
    //   erc20.address,
    //   "vote escrowed Crv",
    //   "veIdle",
    //   "1.0"
    // )

    let veCrv = await ethers.getContractAt("VotingEscrow", "0x5f3b5dfeb7b28cdbd7faba78963ee202a494e2a2", account)

    let weeks = [0,1,2,3,4,5,6,7,8,9,10, 11].map(x => x*26) // half year in weeks
    for (const week of weeks) {
        await time.increase(time.duration.weeks(week))

        let fullBlock = toEtherBN("15000000")
        let tx = await veCrv.checkpoint({gasLimit: fullBlock})
        let receipt = await tx.wait()
        let gasUsed = receipt.gasUsed

        let blockPct = gasUsed.mul('100').div(fullBlock)
        console.log(`Waited ${week} weeks. Gas used: ${gasUsed}. Block pct ${blockPct} %`)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});