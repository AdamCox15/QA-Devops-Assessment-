
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '966bedaa93da4cad95809db0786db959',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('Choices display when draw button is clicked', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(300)
    const choicesDiv = await driver.findElement(By.id('choices'))

    expect(choicesDiv).not.toBe('')
})

test('Check to see if selecting a bot displays it in our new div', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(300)
    await driver.findElement(By.xpath('(//*[text()="Add to Duo"])[1]')).click()

    const playerDuoDiv = await driver.findElement(By.id('player-duo'))
    const displayed = await playerDuoDiv.isDisplayed()

    expect(displayed).toBe(true)
})
