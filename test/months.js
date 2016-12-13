'use strict'

const expect = require('chai').expect

const m2p = require(__dirname + '/../index').months

describe('months', () => {
  describe('Months', () => {
    it('one month', () => {
      // arrange
      let options = { language: 'en' }
      let months = [1]
      // act
      let result = m2p(months, options)
      // assert
      expect(result.months.length).to.equal(1)
      expect(result.months).to.deep.equal(['January'])
    })

    it('several months', () => {
      // arrange
      let options = {language: 'en'}
      let months = [2, 4, 6, 8]
      // act
      let result = m2p(months, options)
      // assert
      expect(result.months.length).to.equal(4)
      expect(result.months).to.deep.equal(["February", "April", "June", "August"])
    })

    it('one month, zero based', () => {
      // arrange
      let options = { language: 'en', zeroBased:true }
      let months = [1]
      // act
      let result = m2p(months, options)
      // assert
      expect(result.months.length).to.equal(1)
      expect(result.months).to.deep.equal(['February'])
    })
  })

  describe('Periods', () => {
    it('one single month', () => {
      // arrange
      let months = [5]
      let options = { language:'en', zeroBased:false }
      // act
      let result = m2p(months, options)
      // assert
      expect(result.periods.length).to.equal(1)
      expect(result.periods).to.deep.equal(["May"])
    })

    it('one period inside year', () => {
      // arrange
      let months = [5,6]
      let options = { language:'en', zeroBased:false, connector:'-' }
      // act
      let result = m2p(months, options)
      // assert
      expect(result.periods.length).to.equal(1)
      expect(result.periods).to.deep.equal(["May-June"])
    })

    it('one period at end of year', () => {
      // arrange
      let months = [11, 12]
      let options = { language:'en', zeroBased:false, connector:'-' }
      // act
      let result = m2p(months, options)
      // assert
      expect(result.periods.length).to.equal(1)
      expect(result.periods).to.deep.equal(["November-December"])
    })

    it('several periods inside year', () => {
      // arrange
      let months = [5,6,9,10]
      let options = { language:'en', zeroBased:false, connector:'-' }
      // act
      let result = m2p(months, options)
      // assert
      expect(result.periods.length).to.equal(2)
      expect(result.periods).to.deep.equal(["May-June", "September-October"] )

    })

    it('period crossing year boundary', () => {
      // arrange
      let months = [11, 12, 1]
      let options = { language:'en', zeroBased:false, connector:'-' }
      // act
      let result = m2p(months, options)
      //
      expect(result.periods).to.deep.equal(["November-January"])
    })

    it('full year (in order)', () => {
      // arrange
      let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      let options = { language:'en', zeroBased:false, connector:'-' }
      // act
      let result = m2p(months, options)
      // assert
      //expect(result.periods).to.deep.equal(["January-December"])
      expect(result.periods).to.deep.equal(["all year"])
    })

    it('full year (in a mess)', () => {
      // arrange
      let months = [6, 2, 10, 5, 1, 7, 8, 12, 4, 3, 11, 9]
      let options = { language:'en', zeroBased:false, connector:'-' }
      // act
      let result = m2p(months, options)
      // assert
      //expect(result.periods).to.deep.equal(["January-December"])
      expect(result.periods).to.deep.equal(["all year"])
    })

  })
})
