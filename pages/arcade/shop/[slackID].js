import { Image, Link } from 'theme-ui'

import { inventoryParts } from '../../api/arcade/inventory'
import { useRouter } from 'next/router'


function orderLink(slackID, url) {
  return url + '&slackID=' + slackID
}


const ShopPage = ({parts, ...props}) => {
  const router = useRouter()
  const { slackID } = router.query

  return (
    <div>
      <h1>Shop</h1>
      <span>{slackID}</span>
      <ul>
        {parts.map(part => (
          <li key={part.id}>
            <h2>
              <Link href={orderLink(slackID, part.fields['Order Form URL'])} target="_blank">
                {part.fields['Name']}
              </Link>
            </h2>
            <p>{part.fields['Name Small Text']}</p>
            <p>{part.fields['Hours']}</p>
            <Image src={part.fields['Image URL']} alt={part.fields['Name']} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopPage

export async function getStaticProps() {
  const allparts = await inventoryParts()
  const parts = allparts.filter(part => part.fields['Enabled'])

  return {
    props: {
      parts
    }
  }
}

export async function getStaticPaths() {
  return ({
    paths: [],
    fallback: 'blocking'
  })
}
