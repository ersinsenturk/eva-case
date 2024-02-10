const BASE_URL = 'https://iapitest.eva.guru'
export const fetchUserApi = async (token, email) => {
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
    GrantType: formData.GrantType,
    Scope: formData.Scope,
    ClientId: formData.ClientId,
    ClientSecret: formData.ClientSecret,
    RedirectUri: formData.RedirectUri
  }
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
}

export const getDailySalesApi = async (token, dailySalesUser) => {
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
}

export const getSkuListApi = async (token, skuData) => {
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
}

export const getSkuRefundRateApi = async (token, refundListData) => {
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
}
