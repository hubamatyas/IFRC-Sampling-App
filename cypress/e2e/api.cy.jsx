import config from '../../src/util/config';

describe('Test the calculator APIs', () => {
  it("Test simple random calculator API", () => {
      cy.api("POST", `${config.api}/simple-random/`, {
          subgroups: null,
          households: 300,
          individuals: null,
          margin_of_error: 5,
          confidence_level: 95,
          non_response_rate: 5,
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("sample_size")
      });
    });


    it("Test simple random calculator API", () => {
      cy.api("POST", `${config.api}/systematic-random/`, {
          subgroups: null,
          households: null,
          individuals: 3000,
          margin_of_error: 5,
          confidence_level: 95,
          non_response_rate: 5,
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("intervals")
      });
    });

    it("Test cluster calculator API", () => {
      cy.api("POST", `${config.api}/cluster-random/`, {
          communities: [
            {name: "Community No.1", size: 1000}, 
            {name: "Community No.2", size: 2000}
          ],
          margin_of_error: 5,
          confidence_level: 95,
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("clusters")
      });
    });

    it("Test time-location calculator API", () => {
      cy.api("POST", `${config.api}/time-location/`, {
          days: 14,
          locations: 3,
          interviews_per_session: 20,
          households: null,
          individuals: 3000,
          margin_of_error: 5,
          confidence_level: 95,
          non_response_rate: 5,
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("units")
      });
    });
});

describe('Test the question fetching APIs', () => {
  it("Test the question fetching APIs", () => {
    cy.api("GET",`${config.api}/decision-tree/1/`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("options")
    })
  })
})
