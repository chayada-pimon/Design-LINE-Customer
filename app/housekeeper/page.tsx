import { EmployeeServicesSection } from "@/components/home/employee-services-section"
import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { HousekeeperAttendanceSection } from "@/components/housekeeper/housekeeper-attendance-section"
import { HousekeeperMenuSection } from "@/components/housekeeper/housekeeper-menu-section"
import { HousekeeperProfileSection } from "@/components/housekeeper/housekeeper-profile-section"

export default function HousekeeperPage() {
  return (
    <HomeLayout>
      <HomeHeader />
      <PageHeading>หน้าหลักพ่อบ้าน</PageHeading>
      <HousekeeperProfileSection />
      <HousekeeperAttendanceSection />
      <HousekeeperMenuSection />
      <EmployeeServicesSection />
    </HomeLayout>
  )
}
