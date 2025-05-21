import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { CalendarIcon, PhoneIcon, HeartPulse, User2Icon, Contact2Icon, Mail, SquarePen } from 'lucide-react'

import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Props {
	userId: string
	name: string
	email: string
}

export default async function ProfileContent({ userId, name, email }: Props) {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from('personal_info')
		.select('age,conditions,emergency_name,emergency_phone_number,phone_number')
		.eq('user_id', userId)
		.single()
	if (error) {
		console.log('error while retrieving profile_info ')
	}

	if (!data) {
		redirect('/get-started?page=profile')
	}

	return (
		<div className="space-y-6 max-w-2xl mx-auto my-4">
			<Link href={'/get-started?page=profile&edit=true'}>
				<Button className="mb-4">
					Edit Profile <SquarePen />
				</Button>
			</Link>
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<User2Icon className="w-4 h-4" /> Name
								</TableCell>
								<TableCell>{name ?? 'N/A'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<Mail className="w-4 h-4" /> Email
								</TableCell>
								<TableCell>{email ?? 'N/A'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<CalendarIcon className="w-4 h-4" /> Age
								</TableCell>
								<TableCell>{data?.age ?? 'N/A'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<PhoneIcon className="w-4 h-4" /> Phone Number
								</TableCell>
								<TableCell>{data?.phone_number ?? 'N/A'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<HeartPulse className="w-4 h-4" /> Medical Conditions
								</TableCell>
								<TableCell>{data.conditions.join(', ') ?? 'N/A'}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Emergency Contact</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<User2Icon className="w-4 h-4" /> Name
								</TableCell>
								<TableCell>{data?.emergency_name ?? 'N/A'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="flex items-center gap-2 font-medium">
									<Contact2Icon className="w-4 h-4" /> Phone Number
								</TableCell>
								<TableCell>{data?.emergency_phone_number ?? 'N/A'}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
