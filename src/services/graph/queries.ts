import { gql } from 'graphql-request'

export const getPoolsQuery = gql`
    query GetPools {
        pairs(orderBy: volumeUSD, orderDirection: desc) {
            id
            reserve0
            reserve1
            token0 {
                decimals
                id
                name
                symbol
            }
            token1 {
                id
                name
                symbol
                decimals
            }
            totalSupply
            volumeUSD
            reserveUSD
        }
    }
`
