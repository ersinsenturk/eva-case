const BASE_URL = 'https://iapitest.eva.guru'
export const fetchUserApi = async (token, email) => {
  try {
    const userResponse = await fetch(`${BASE_URL}/user/user-information`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const { Data: userData } = await userResponse.json()
    const { user } = userData
    return user
  } catch (error) {
    throw new Error('An error occured')
  }
}

export const logoutUserApi = async (token) => {
  await fetch(`${BASE_URL}/user/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getTokenApi = async (formData) => {
  const authData = {
    Email: formData.email,
    Password: formData.password,
    GrantType: 'password',
    Scope: 'amazon_data',
    ClientId: 'C0001',
    ClientSecret: 'SECRET0001',
    RedirectUri: 'https://api.eva.guru'
  }
  try {
    const tokenResponse = await fetch(`${BASE_URL}/oauth/token`, {
      method: 'POST',
      body: JSON.stringify(authData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const { Data } = await tokenResponse.json()
    const token = Data.AccessToken
    return token
  } catch (error) {
    throw new Error('An error occured')
  }
}

export const getDailySalesApi = async (token, dailySalesUser) => {
  try {
    const response = await fetch(`${BASE_URL}/data/daily-sales-overview`, {
      method: 'POST',
      body: JSON.stringify({ ...dailySalesUser }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getSkuListApi = async (token, skuData) => {
  try {
    const response = await fetch(`${BASE_URL}/data/daily-sales-sku-list`, {
      method: 'POST',
      body: JSON.stringify({ ...skuData }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getSkuRefundRateApi = async (token, refundListData) => {
  try {
    const response = await fetch(`${BASE_URL}/data/get-sku-refund-rate`, {
      method: 'POST',
      body: JSON.stringify({ ...refundListData }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}
