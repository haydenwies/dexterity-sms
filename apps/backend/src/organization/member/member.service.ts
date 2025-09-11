import { Injectable, NotFoundException } from "@nestjs/common"

import { Member } from "~/organization/member/member.entity"
import { MemberRepository } from "~/organization/member/member.repository"

@Injectable()
class MemberService {
	constructor(private readonly memberRepository: MemberRepository) {}

	async getAllByUserId(userId: string): Promise<Member[]> {
		const organizationUsers = await this.memberRepository.findAllByUserId(userId)

		return organizationUsers
	}

	async get(userId: string, organizationId: string): Promise<Member> {
		const member = await this.memberRepository.find(userId, organizationId)
		if (!member) throw new NotFoundException("Organization user not found")

		return member
	}

	async find(userId: string, organizationId: string): Promise<Member | undefined> {
		return this.memberRepository.find(userId, organizationId)
	}

	async create(userId: string, organizationId: string): Promise<Member> {
		const member = Member.create({ userId, organizationId })
		const createdMember = await this.memberRepository.create(member)

		return createdMember
	}
}

export { MemberService }
