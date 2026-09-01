import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { ProfileEditForm } from "@/components/profile/profile-edit-form"

export default function ProfileEditPage() {
  return (
    <HomeLayout>
      <HomeHeader />
      <PageHeading>ข้อมูลของฉัน</PageHeading>
      <ProfileEditForm />
    </HomeLayout>
  )
}
