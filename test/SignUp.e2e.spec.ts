import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/signUp', { waitUntil: 'networkidle' })
  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('123812641264')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
  await page.waitForTimeout(500)

  const toast = await page.getByText('Restaurante Cadastrado com sucesso!')
  await expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('/signUp', { waitUntil: 'networkidle' })
  await page.getByLabel('Nome do estabelecimento').fill('Invalid name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('123812641264')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
  await page.waitForTimeout(500)

  const toast = await page.getByText('Erro ao cadastrar o Restaurante.')
  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/signUp', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()
  await expect(page.url()).toContain('/signIn')
})