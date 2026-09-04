import { Header } from "@/components/home/Header"
import { HomeLayout } from "@/components/home/home-layout"
import { ProfileEditForm } from "@/components/profile/profile-edit-form"

export default function ProfileEditPage() {
  return (
    <HomeLayout>
      <Header backHref="/profile" showProfileCard={false} title="ข้อมูลของฉัน" />
      <ProfileEditForm />
    </HomeLayout>
  )
}
