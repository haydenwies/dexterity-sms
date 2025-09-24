import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Stripe } from "stripe"

const BILLING_PROVIDER = "billing-provider"
type BillingProvider = Stripe

const billingProviderFactory: Provider = {
	provide: BILLING_PROVIDER,
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => {
		const stripe = new Stripe(configService.getOrThrow<string>("billing.stripeApiKey"))

		return stripe
	}
}

export { BILLING_PROVIDER, billingProviderFactory, type BillingProvider }
