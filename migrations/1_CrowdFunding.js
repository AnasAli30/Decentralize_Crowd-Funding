const Migrations = artifacts.require("CrowdFunding");

module.exports = function (deployer) {

  deployer.deploy(Migrations,"1000","36000");
};