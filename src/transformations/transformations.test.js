const expect = require("chai").expect;
const t = require("./transformations");

describe("Calcultator tests using EXPECT interface from CHAI module: ", () => {
    it('Should transform Time correctly', () => {
        const res = t.timeConvert("90");
        expect(res).to.equal("1h 30");
    })
    it('Should transform Legs correctly', () => {
        const legs = [{
            Id: '1',
            Departure: '2019-05-30T19:20:00',
            Arrival: '2019-05-30T20:40:00',
            Duration: '90'
        }];
        const transformedLegs = [];
        transformedLegs["1"] = {
            departure : "19:20",
            arrival : "20:40",
            duration : "1h 30"
        };
        const legsRes = t.getLegs(legs);
        expect(legsRes).to.deep.equal(transformedLegs);
    })
})
