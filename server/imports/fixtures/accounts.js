import faker from "faker";
import { Factory } from "meteor/dburles:factory";

/**
 * Factory account
 */

export function getUser() {
  const existingUser = Meteor.users.findOne();
  return existingUser || Factory.create("user");
}

export function getAddress(options = {}) {
  const defaults = {
    fullName: faker.name.findName(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    company: faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    region: faker.address.stateAbbr(),
    postal: faker.address.zipCode(),
    country: faker.address.countryCode(),
    isCommercial: faker.random.boolean(),
    isShippingDefault: faker.random.boolean(),
    isBillingDefault: faker.random.boolean(),
    metafields: []
  };
  return _.defaults(options, defaults);
}

createAccountFactory = function () {
  Factory.define("account", Accounts, {
    shopId: Factory.get("shop"),
    userId: getUser(),
    emails: [{
      address: faker.internet.email(),
      verified: faker.random.boolean()
    }],
    acceptsMarketing: true,
    state: "new",
    note: faker.lorem.sentences(),
    profile: {
      addressBook: [
        getAddress()
      ]
    },
    metafields: [],
    createdAt: new Date,
    updatedAt: new Date()
  });
};

export default function () {
  createAccountFactory();
}
