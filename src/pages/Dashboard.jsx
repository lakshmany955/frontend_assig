import Card from '../components/Card'
import { useGetProductStatsQuery } from '../store/api'
import CategoryBar from '../components/Charts/CategoryBar'

export default function Dashboard() {
  const { data } = useGetProductStatsQuery()
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Welcome">Use the sidebar to navigate.</Card>
      <Card title="Product Categories">
        <CategoryBar data={data || []} />
      </Card>
      <Card title="Activity">Recent activity.</Card>
    </div>
  )
}