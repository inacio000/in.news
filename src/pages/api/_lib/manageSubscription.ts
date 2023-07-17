import { fauna } from "@/src/services/fauna";
import { stripe } from "@/src/services/stripe";
import { query as q } from "faunadb";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
) {
  // Buscar o usuario no fauna com o Id
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
            q.Index('user_by_stripe_customer_id'),
            customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // Salvar o usuario (dados da subscription) no fauna
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }
  
  if (createAction) { // Criando nova subscription
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData}
      )
    )
  } else {
    // Atualizando a subscription
    await fauna.query(
      q.Replace(
        q.Select(
          // Buscando a subscription pela Ref (id) e trocar toddos dados
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId,
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }
}